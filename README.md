# LLSIF-CardGenerator

A LoveLive! School Idol Festival card image generator written in NodeJS.

## How to use

### Getting Started

To get started, you should:

* Get a current version (>4.0) LoveLive! School Idol Festival install package, and have `AppAssets.zip` unzipped, deciphered, texture banks unpacked into a folder, we call internal here.
* Getting all updating packages, unzipped, deciphered, texture banks unpacked into a folder, we call it external here.
* Get a folder you wish to generate your card images to, we called generated here.
* Copy and modify `config/config.sample.json` to `config/config.json`, point three paths to the directories you set above.

### Generate Card Images

#### Generate Cards

You could generate cards by running

```bash
$ node src/scripts/gen_card
```

#### Generate UR Pairs

You could generate UR pairs by running

```bash
$ node src/scripts/gen_pair
```

#### Generate Icons

You could generate cards by running

```bash
$ node src/scripts/gen_icon
```

### Use as a Server Backend

With code fully written in NodeJS, it is posible you could intergrate it into a NodeJS server, and generate card images dynamically.

You could refers to scripts `src/scripts` folder to see how to get `Buffer`s of images each type, and stream them to a server response.

### Switch to a Image Processing Backend other than Sharp

You should be able to switch to a image processing backend other than sharp, but refer to `src/sharp` first. All you need to do is to handle layer merging use your preferred backend.

## Dependencies

This project depends on:
* **bluebird** - for promise-like calls
* **sharp** - for image processing
* **lodash**
* **sequelize** - for reading sqlite databases