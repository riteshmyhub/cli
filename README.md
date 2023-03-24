CLI tools for fetching JavaScript library and framework files

### installation

- step 1 : create dir environment
- Item 2 : create file environment.js

``` 
environment.js

export const environment = Object.freeze({
   disabled: false,
   production: true,
   baseUrl: "https://api.github.com/repos/{{githubUsername}}/{{repositoryName}}/contents/{{rootFolder}}",
});
```

```
  npm i cli -g
```