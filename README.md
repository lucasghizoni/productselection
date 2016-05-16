# Products Selection
You need nodejs properly installed on your machine

## Cloning the repo and installing dependencies
``` git clone```

``` cd skychallenge ```

``` npm install ```

## Running the application

``` nodejs app.js ```

### Tests
You will need to install mocha:
``` npm install -g mocha ```

##### Unit tests
 ``` mocha test/unit/* ```

##### Api tests
To run these tests, the server should not be up.

``` mocha test/api/* ``` 

##### Interface tests
You will need to install chromedriver:
``` npm install -g chromedriver ```

Then start the server: 
``` nodejs app.js ```

Now you can run the interface tests:
``` mocha test/selenium/* ```


