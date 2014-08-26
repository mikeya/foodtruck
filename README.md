SF Food Truck Locater
[Link to App](http://foodtruck-env-ummn222ygm.elasticbeanstalk.com/)
=========

Technical Track: Full Stack

Reasoning
=========
I chose Python for my back-end technology because I have equal experience with it and Ruby (Rails) and Node.js, but it's what Uber uses so why not.  I'm not an expert in Python but I've built a web crawler, set up a few RESTful servers, deployed scripts and managed AWS tools using it.  I figured that'd be enough knowledge to get me through this challenge.  I chose Flask as it has very simple routing syntax and really all I needed was a few routes to communicate with external APIs.
For the front end I choose to use Backbone and Underscore.  I didn't really need the full Backbone MVC framework, really just the CV.  I wasn't managing data, just taking API data and rendering it on the page.  I used a little Sass to style the popup windows and my stellar intro modal.  I used the Google Maps Api to display a map and pin food trucks.  I used the Yelp API to get richer data on the trucks than what was provided by the SF Gov. API.


Trade-Offs
=========
Would've been nice to have a few more APIs that could provide richer data; then sort and combine the data in a cron job daily and store it in a database.
Would've been nicer to clean up the front end and make it prettier. The Backbone controller performs a little logic that I would've liked to move to the Python layer.
Would've put in automated tests at least for data and no data states.


Work I'm Proud Of
=========
Created responsive framework for current employer (see Linkedin). Built out various pages as well as sitewide header and footer.
Worked on the full stack (Java (Spring, Hibernate), JSP, JS, Sass) for recently released project [See Here](http://www.glassdoor.com/Benefits/Glassdoor-US-Benefits-EI_IE100431.0,9_IL.10,12_IN1.htm)


Links
=========
[Linkedin](www.linkedin.com/pub/michael-abell/3/b65/b82/)