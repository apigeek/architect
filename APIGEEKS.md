You're a true geek
------------------

Initialise the ./target directory

	$ apigeek

Start your server

	$ apigeeks --listen 1337

Run a feature
	
	curl -v http://localhost:1337/feature/example


Parse a feature
	
	curl -v http://localhost:1337/parse/example

Download as-built assets
	
	curl -O http://localhost:1337/asbuilt/example.zip
	unzip example.zip -d example
	

