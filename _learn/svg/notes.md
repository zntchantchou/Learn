### viewbox

La valeur de l'attribut viewBox est une liste de quatre nombres min-x, min-y, width et height, séparés par des espaces ou/et des virgules. Ces nombres spécifient un rectangle dans l'espace utilisateur, qui doit correspondre aux coins du viewport établis par l'élément SVG donné, ceci en prenant en compte l'attribut preserveAspectRatio.
Source: https://developer.mozilla.org/fr/docs/Web/SVG/Attribute/viewBox

### arc

A 20,20 0,0,1 50,30

20,20: The radii of the ellipse (horizontal radius, vertical radius).
0,0,1: These three values control the rotation and large-arc-flag of the ellipse. In this case:
0: The rotation of the ellipse (in degrees) is 0.
0: The large-arc-flag is set to 0, meaning it will take the smaller of the two possible arcs.
1: The sweep-flag is set to 1, meaning it will be drawn in the positive angle direction (clockwise).
50,30: The end point of the arc.
