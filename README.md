# wysiwyg-image-migration
The goal of this repository is to replace wysiwyg-formatted string in an article body with the <img /> tags. It will generate a CSV file as an output ready to be imported into Wordpress.

## Steps to run

1. Install all dependencies

```bash
yarn
```

2. Start the process

Note: Make sure that you have JSON file in the root directory, please check the index.js file for the required file name.

```bash
yarn start
```

If the whole process is successful, you should see the CSV file in your root directory.