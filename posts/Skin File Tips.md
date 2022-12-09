---
title: Skin File Tips
tags: 
    - Design
    - Skins
author: Risky Player 13
--- 
There are mostly no major limitations to want you can upload to the skin editor except for the file size especially if you are making skins just for the fun of it. This being said, some people might have other things in mind like game performance or asking the developer to add the skin to the game.

If you want your skin to have a good chance of being added to the game, you definitely want to minimize the text file size of your skin since when a skin is added to the game, it increases the initial loading time of the game when you press Play button, and Defly's Developer cares about this.

Another thing to note is unnecessary layers (rotors). Each layer that is added to skin affects game's performance so you might want keep the number of your layers as low as possible.

Here are some tips for reducing text file size:

- My guess about optimal text file size is something about 25kbs. It's just a guess based on the reconstruction of the default skin using the PNG files in the skin design channel of the main server (and some other skins). Try to get your text file size to something about that.

- It is stated in the main server's skin design that the PNG file should be 256x256. This obviously affects the file size a lot, but the thing is that your PNG file doesn't necessarily need to be 256x256, you see a lot PNG files used in the game that are larger than that. But more importantly, your PNG file can be smaller than 256x256. This is especially useful if you are struggling to lower your file size; and also have this in mind that there are scaling options in the skin editor that can resize your original PNG file so they would look as if they were 256x256 (with less quality).

- Changing The bit depth of your PNG file can help a lot in reducing file size. Usually the bit depth of PNG files is set to RGBA8 (Red, Green, Blue, Alpha (transparency)) or RGBA16. The thing is that most of your PNG files for skin editor will be black and white and will be later tinted by the game. So you can use other bit depths that make your PNG file appear black and white like GrayAlpha8 to reduce your PNG file size.
I doubt that this will be ever the case but if your PNG file doesn't have any transparent areas, you can remove the Alpha too.
Bit depth setting is usually available when you are saving or exporting your PNG file.