PG&E - MRAD Node.js Coding Challenge
You need to create an AWS lambda function to do the following:
Create a RESTful API which executes the following steps for every request
a. Pull data from this url: https://gbfs.divvybikes.com/gbfs/en/station_information.json
b. Make some changes to the output from the url above:
1. Remove rental_methods and rental_uris from the output.
2. Rename: external_id, station_id, and legacy_id into externalId, stationId, and
legacyId.
3. Return the data when the capacity is less than 12.
c. Convert your JSON output into CSV.
d. Write your output into a filesystem as a .csv file.
e. Upload your file to S3. (overwrite or create a new file)

Requirements
• Use Hapi (node framework).
• Use async/await.
• Add a unit-test for the API call.
• Use whatever node packages you like but don’t install a 3rd party databases,
caching, or other server apps.
• Optimize the app as best as possible for performance and assume your app will run
in a multiprocessor or multicore environment.
• Setup your app so it can be run locally.

Really Nice To Have (bonus):
• API request would have an API token and handle the case where this is missing.
• Containerize your app so it can be deployed using Docker.
• Anything to make your project stand out!

Submission
Provide the source code to your project through a file or code repository.
Please include a README in the project that has information on how to run your project and
any additional details.