
# Tibia Bosses Tracker

This is a web app written in React, designed to track bosses in the MMORPG game, Tibia.

# Fundamentals

A boss has a range of dates when it may appear after its previous defeat.
E.g., Dharalion was killed 2 days ago, and its time range to reappear is between 4 to 6 days.

The app calculates the probability of a boss's appearance based on the comparison between the last kill date and the time range.

## Limitations

This app currently only works for the Venebra world and does not require user setup; it is open for anyone to use.

## Data Source

The probability calculation is complex and requires a daily update of the last day's killed bosses. Therefore, I integrated this web app with a personal API that sources data from multiple platforms.

The primary data source is GuildStats. However, this API also connects to TibiaBosses and Tibia-Statistics.

## Future Implementations

- Implement user management.
- Add additional worlds.
- Introduce a Boss Detail page with a Probability Graph.
