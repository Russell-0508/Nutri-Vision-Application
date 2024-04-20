# SC2006 Nutri-Vision Application

![App Logo](/MobileApp/assets/appLogo.png)

# About
This is a project for NTU SC2006 Software Engineering Module.

We have developed a mobile application that enables users to keep track of their food intake and make healthier food choices. The best part is, Nutri-Vision automatically identifies food ingredients based on images captured or uploaded and auto-calculates the corresponding macro-nutrients, making it more user-friendly and convenient.

# Goals
Our project was inspired by the well known mobile application MyFitnessPal. However, we wanted to enhance the user convenience by allowing users take pictures of their food and directly receive the macronutrients from it, rather than having to individually key in each ingredient/food item in their meals. Hence, we used OpenAI API to recognise the food images, and subsequently sent the image into Calorie Ninja API to retrieve the macronutrient values for display to the user. This was also a unique feature of our application. Even though this application was made for the purpose of a school module, we hope to see further incorporations of Artificial Intelligence into more mobile applications on the market in the future.

# Tech Stack
Front-End : React Native  
Back-End : Firebase
