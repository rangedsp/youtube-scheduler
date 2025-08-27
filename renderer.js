const today = new Date().toISOString().split("T")[0];
document.getElementById("startDate").value = today;
document
	.getElementById("schedulerForm")
	.addEventListener("submit", function (e) {
		e.preventDefault();
		const data = {
			// sourceType: document.getElementById("sourceType").value,
			sourceId: document.getElementById("sourceId").value,
			episodesPerDay: document.getElementById("episodesPerDay").value,
			startTime: document.getElementById("startTime").value, // <-- single time
			startDate: document.getElementById("startDate").value,
		};

		console.log("Form Data Collected:", data);
		window.electronAPI.sendSchedule(data);
	});

// listen for reply
window.electronAPI.onScheduleReply(async (icsString) => {
	try {
		// Save in browser (renderer) with Blob
		const blob = new Blob([icsString], { type: "text/calendar" });
		const url = URL.createObjectURL(blob);
		const link = document.createElement("a");
		link.href = url;
		link.download = "youtube-schedule.ics";
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
		URL.revokeObjectURL(url);
	} catch (err) {
		console.error("Error generating ICS:", err);
	}
});
