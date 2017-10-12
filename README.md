# Random Position On The Surface Of A Sphere
Sometimes you just need to postion things on the surface of a sphere. Here are a few methods I've used over the years.

Blog post coming soon.

getCartesianPositions(100000, 50) Note the vertical clustering. 😬 ![getCartesianPositions(100000, 50)](screenshots/Vec3.png?raw=true)
getSphericalPositions(100000, 50) Note the clustering at the poles. 😠 ![getSphericalPositions(100000, 50)](screenshots/Spherical.png?raw=true)
getSphericalPositionsWithBias(100000, 50, 1) Clustering at the equator! 😢 ![getSphericalPositionsWithBias(100000, 50, 1)](screenshots/Spherical%20Bias%201.png?raw=true)
getSphericalPositionsWithBias(100000, 50, 0.5) 🙂 ![getSphericalPositionsWithBias(100000, 50, 0.5)](screenshots/Spherical%20bias%200.5.png?raw=true)
getUniformPositions(10000, 50) ![getUniformPositions(10000, 50)](screenshots/Uniform.png?raw=true)
