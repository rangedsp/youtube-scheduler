# Youtube Scheduler

## Problem Statement

> a program that lets one watch a schedule of youtube videos
> For instance, it would be nice to have a calendar that is linked to my youtube subscriptions, and the program can cycle through all the of the youtube videos and post them to my calendar on what ever basis I declare - such as : I want to watch 2 episodes of channel A twice a day, 1 episode of channel B once a day, for the entire month, or whatever period I declare.
> I don't know enough of web development to build this myself. I am currently studying a different subject in college, but I have so many educational videos that I want to view, and I want a program to "plan it all out for me"... like an auto populate my calendar by going down a list of available videos from each subscription and assigning a certain number of them to be viewed on the specified days

## Acceptance Criteria

MVP:

1. Find list of videos given channel / playlist
2. Allow users to choose frequency (1-24 episodes per day, start time for each)
3. Create calendar invite series

Stretch goal:

1. List user's subscriptions
2. Choose which videos to add / skip
3. User friendly UI
4. Better scheduling options

## Naive solution

> use the youtube api, grap playlists and video links, then plus the video link into something like:
> <https://www.npmjs/package/ics>
> **couple of hours side project**

Painted myself into a corner, sorry dude. Gonna be honest here, I'm thinking a day or two now

## Changelog

### v0.1

- Made a simple UI in electron, this should allow for easy packaging for users with little technical background to get all the libraries working
- Pair coded with gpt5, came up with something simple that creates ics files
- KNOWN BUG: All videos are scheduled for the same day, that's pretty dumb, need to space it out
