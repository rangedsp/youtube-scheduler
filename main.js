const { app, BrowserWindow, ipcMain } = require("electron/main");
const youtubesearchapi = require("youtube-search-api");
const { createEvents } = require("ics");

const path = require("node:path");

const createWindow = () => {
	const win = new BrowserWindow({
		width: 800,
		height: 600,
		webPreferences: {
			preload: path.join(__dirname, "preload.js"),
		},
	});

	win.loadFile("index.html");
};

function buildYouTubeCalendar(videos, options) {
	const { startDate, startTime, durationMinutes, recurrenceRule } = options;

	// split input into usable parts
	const [year, month, day] = startDate.split("-").map(Number);
	const [hour, minute] = startTime.split(":").map(Number);

	const events = videos.map((item, index) => {
		// each video offset by +index days, if you want sequential daily
		const start = [year, month, day, hour, minute];

		return {
			start,
			duration: { minutes: durationMinutes },
			title: item.title,
			description: `Watch YouTube video ${item.url}`,
			status: "CONFIRMED",
			busyStatus: "BUSY",
			recurrenceRule, // applies recurrence
		};
	});

	return createEvents(events);
}
app.whenReady().then(() => {
	// Listen for schedule data from renderer
	ipcMain.on("schedule:submit", async (event, data) => {
		console.log("Received schedule data:", data);
		let results = await youtubesearchapi.GetPlaylistData(data.sourceId);

		const videos = [];

		if (results && results.items) {
			for (const item of results.items) {
				// console.log(item.length);

				videos.push({
					title: item.title,
					url: `https://www.youtube.com/watch?v=${item.id}`,
					// length: item.length,
				});
			}
		}

		const { error, value } = buildYouTubeCalendar(videos, {
			startDate: data.startDate,
			startTime: data.startTime,
			durationMinutes: 30,
			recurrenceRule: `FREQ=DAILY;COUNT=${data.episodesPerDay}`,
		});
		if (error) {
			console.log("error!", error);
		}

		console.log(value);

		event.reply("schedule:reply", value);

		// 👉 Here you can do something with it
		// e.g. generate .ics file, save to disk, etc.
	});

	createWindow();

	app.on("activate", () => {
		if (BrowserWindow.getAllWindows().length === 0) {
			createWindow();
		}
	});
});

app.on("window-all-closed", () => {
	if (process.platform !== "darwin") {
		app.quit();
	}
});
