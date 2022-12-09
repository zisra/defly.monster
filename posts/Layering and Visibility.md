---
title: Layering and Visibility
tags: 
    - Design
    - Skins
author: Hyperion
---
While making a skin, the editor has these feature to keep your rotors organized: Layering and Visibility

These two features help you for doing transitions between stances and to give your skin the right volume.

In visibility, the editor allows you to:
- Make one image visible while moving, while still or in both stances
- Creating transitions

If you want your rotors to still show up when idle and moving, make the value of visibility 0. If you don't want this, then you'll choose between 1 and 2, so the rotor you chose will only show up in one stage, depending on what you want to do with your skin animation. For making it visible while moving choose 1, and for making it visible while still make it 2.

Always make sure the rotors gets a number here, if you leave it blank it will automatically change to 0

Another important step to make sure your rotors are well organized is the Layering of the rotors. When uploading rotors, the editor allows you to choose in which layer one rotor will be, either in the highest layers or in the lowest one. If you want your rotor in the lowest layer, make the value 0. From that, choose ahigher* number for the other rotors so they appear on the highest layers.

If you choose a value similar to one from another rotor, the highest one in the order of rotors will be over the other one.

Both Layering and Visibility are important at the final touches of your skin. Sometimes the rotors look well placed once moving but seems different when  idle because one rotor disappeared or a new one is there. Although visibility doesn't affect the layering, always check it before using the skin to avoid these troubles. 
For example, this is an image from the rotors of Golden Claw. 

![Visibility common mistakes](img/visibility_common_mistakes.png)

- The blue part is a tinted fade in the back I want to only show up when moving, so I chose the lowest layer and the value of visibility 1 (visible when moving).
- The red part is a No Tint that I want it to show up every time, so it is on the top layer and has 0 as their visibility value (all the time)
- The green parts are other rotors, like body parts, tinted stuff and different fades, so they have a different layer each between 0 to 10, but I chose their visibility value to be 2 so that they all are visible once staying still, making a transition effect. 