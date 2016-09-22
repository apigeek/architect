You're a true geek
------------------

Check out this repository

	git fork apigeek.architect.git

	cd apigeek-architect

Build the demo
	
	$ apigeek

Start your server

	$ apigeeks --listen 1337

Try the web API
	
	$ curl -v http://localhost:1337/feature/noop

Only validate a feature
	
	$ curl -v http://localhost:1337/parse/example

Or download the as-built demo.zip file
	
	$ curl -O http://localhost:1337/asbuilt/example.zip
	$ unzip example.zip -d example

The as-built demo is best viewed in a web browser:
		
	$ open http://localhost:1337/asbuilt/example/

Thanks to./features/blueprint.feature and ./features/zip.feature for their help with the as-built demo.

Take a look at them and the ./blueprints/ folder

The "green tick" icon on the home page will re-generate the as-built assets from the blueprint

Modify the files in ./blueprints/example

Then, refresh the browser to re-generate. It it fails to executes, the icon turns red.

Over to you ... 

And if you're a community geek, please share your features and blueprints. 

-me-
