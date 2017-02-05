package:
	cp ~/.ssh/unpepefy.pem key.pem
	zip -r ../unpepefy.zip content.js icon128.png icon64.png icon48.png icon32.png manifest.json key.pem
	rm key.pem

clean:
	rm -f ../unpepefy.zip
