Trespassing is a disturbing issue which not only affects people’s assets but may also costs theirs lives. When people go out, their house will be left empty with no one to watch over the house. Therefore, this is a perfect opportunity for burglars and trespassers to enter their houses. One way of preventing it is to install cameras inside and outside of the house. However, these cameras can only record what already happened, so when a burglary happens, it can help identify the burglar but not actually prevent it from happening. Some modern IP cameras are integrated with motion sensors that can detect anything that moves, and they can stream what they recorded to a mobile application so that house’s owner can see what is happening in real time remotely. Nonetheless, not everyone has the time to watch over their house all the time and the motion sensors can sometimes mistake for something else that also moves like a cat or a dog. Due to the increase in the number of cameras and the lack of human resources to monitor them manually, security breaches and trespassing are still occurring. Therefore, to enhance surveillance and avoid unauthorized access, cameras should be integrated with smart system that can detect and track human’s movement in real time at an acceptable speed.  

In this project, I have created a trespasser detector system that connects a camera (webcam) to detect and track people’s movement in real time. If a trespasser is spotted, an alert email will be sent to the house’s owner along with a screenshot captured by the camera. The difficult task is that from a computer perspective, it is heavily affected by a wide range of possible appearance, pose, background and lighting of a person. Thus, the detector needs to be feed with a variety of data to be able to detect in these special conditions.  

The detector is built from Single Shot Detector MobileNet v1, a lightweight state-of-the-art deep neural network model that exchanges accuracy for speed, and speed is what essential to be able to run in real time on a low processing-power machine.  

The application operates as described in the following diagram: 
![image](https://user-images.githubusercontent.com/46740045/121009902-e6832480-c7be-11eb-8d11-e9dd6883bd64.png)

After running the application, it will show the camera feed, whatever is recorded by the webcam will be displayed on the computer. If a person enters the frame, it will instantly detect that person and draw a bounding box to locate where the person is in the frame. The confidence score is also really high with 98%, this means that the model is 98% sure that the object it detected in the frame is a person. Although only half of my body is visible in the frame, the model can still detect me as person. The FPS is also really high compared to running the Faster R-CNN model. If it detects at least one person in a frame, status will change to “Person detected” and if not, it will display “Person not detect”

![image](https://user-images.githubusercontent.com/46740045/121010553-c4d66d00-c7bf-11eb-925f-8f06493addee.png)

The alert email sent to house’s owner about trespassing. It also sends along with an attachment which is the screenshot captured when it first detects someone.

![image](https://user-images.githubusercontent.com/46740045/121010566-c9028a80-c7bf-11eb-931d-84baf51adcf3.png)

After receiving the mail, the house’s owner should go to the website to check the cameras. The website only displays recorded videos but my intention at first was to build a website that can stream directly from the cameras. However, due to time restriction, I could not turn this idea into practice but it might as well be one of the improvement in the future.

![image](https://user-images.githubusercontent.com/46740045/121010586-ce5fd500-c7bf-11eb-8ae1-2c392111f844.png)
