// lists regimens (coach view)
// -- athletes assigned to it with status (assigned, missing, done)


/*

REGIMENS table:
id:
name
duration
due_date
assigned_athletes {}
focus {}
drills {}

ATHLETE_REGIMENS table:
id:
from_regimen (reference REGIMENS table)
assigned_athlete_id (reference athlete ID)
drills_status {} (references drills id + status like {"Shooting Steps:  1. Shoot", "missing"} or maybe just the drill id)
regimen_status (status of regimen as whole if DONE, MISSING, ASSIGNED)



*/