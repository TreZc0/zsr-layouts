# ZSR-Layouts
The on-stream graphics used for ZeldaSpeedRuns Community Races

This is a [NodeCG](http://github.com/nodecg/nodecg) v0.9 bundle. You will need to have NodeCG v0.9 installed to run it.

## Requirements
- [NodeCG v0.9.x](https://github.com/nodecg/nodecg/releases)
- [Node.js v7 or greater](https://nodejs.org/)

## Installation
1. Install to `nodecg/bundles/zsr-layouts`.
2. Install `bower` if you have not already (`npm install -g bower`)
3. Install a compiler toolchain:
	- **WINDOWS**: Install [`windows-build-tools`](https://www.npmjs.com/package/windows-build-tools) to install the tools necessary to compile `sgdq17-layouts`' dependencies.
	- **LINUX**: Install `build-essential` and Python 2.7, which are needed to compile `sgdq17-layouts`' dependencies.
4. `cd nodecg/bundles/sgdq17-layouts` and run `npm install --production`, then `bower install`
5. Create the configuration file (see the [configuration][id] section below for more details)
6. Run the nodecg server: `nodecg start` (or `node index.js` if you don't have nodecg-cli) from the `nodecg` root directory.

Please note that you **must manually run `npm install` for this bundle**. NodeCG currently cannot reliably compile this bundle's npm dependencies. This is an issue we hope to address in the future.

## Usage
This bundle is not intended to be used verbatim. Some of the codelines have be replaced with placeholders, and most of the hardcoded datasources have been blanked out. This bundle is open sourced so other NodeCG users have a chance to look into and benefit from the multiple extensions and dashboard functionalities created to support online speedrun events.

To reiterate, please don't just download and use this bundle as-is (it won't work). Build something new from it.

## Configuration
To configure this bundle, create and edit `nodecg/cfg/zsr-layouts.json`.  
Refer to [configschema.json](configschema.json) for the structure of this file.

## Example
For a showcase of the ZSR Community Race functions (front-end), check a recent twitch highlight on ZSR: https://www.twitch.tv/videos/210392371

## License
zsr-layouts is provided under the Apache v2 license, which is available to read in the [LICENSE](LICENSE) file.

### Credits
Designed & developed by [ZeldaSpeedruns](http://zelda.speedruns.com)
 - [Marwin "dragonbane0" Misselhorn](https://twitter.com/dragonbane0/)
 - [Christoph "TreZc0_" Wergen](https://twitter.com/trezc0_)
 
 Original base (sgdq17-layouts) by [Support Class](http://supportclass.net/)
# zsr-layouts

