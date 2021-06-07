# 1. Introduction
Trespassing is a disturbing issue which not only affects people’s assets but may also costs theirs lives. When people go out, their house will be left empty with no one to watch over the house. Therefore, this is a perfect opportunity for burglars and trespassers to enter their houses. One way of preventing it is to install cameras inside and outside of the house. However, these cameras can only record what already happened, so when a burglary happens, it can help identify the burglar but not actually prevent it from happening. Some modern IP cameras are integrated with motion sensors that can detect anything that moves, and they can stream what they recorded to a mobile application so that house’s owner can see what is happening in real time remotely. Nonetheless, not everyone has the time to watch over their house all the time and the motion sensors can sometimes mistake for something else that also moves like a cat or a dog. Due to the increase in the number of cameras and the lack of human resources to monitor them manually, security breaches and trespassing are still occurring. Therefore, to enhance surveillance and avoid unauthorized access, cameras should be integrated with smart system that can detect and track human’s movement in real time at an acceptable speed.  

In this project, I have created a trespasser detector system that connects a camera (webcam) to detect and track people’s movement in real time. If a trespasser is spotted, an alert email will be sent to the house’s owner along with a screenshot captured by the camera. The difficult task is that from a computer perspective, it is heavily affected by a wide range of possible appearance, pose, background and lighting of a person. Thus, the detector needs to be feed with a variety of data to be able to detect in these special conditions.  

The detector is built from Single Shot Detector MobileNet v1, a lightweight state-of-the-art deep neural network model that exchanges accuracy for speed, and speed is what essential to be able to run in real time on a low processing-power machine.  

# 2. Data collecting and training process

### 2.1 Collect images for datasets

The dataset contains 270 images in total, collected from Kaggle. It will be divided into 2 separated sets in the ratio of 8 to 2. One is used for training and the other is used for testing. Thus, the training dataset contains 216 images in total while the testing dataset only contains 54 images. All images are colored and have the extension name of “.png”. They are all kept as 256x256 by size to maintain a consistent training pattern and prevent bias, which is likely to happen if some of the images in the dataset is different from the others. 

![image](https://user-images.githubusercontent.com/46740045/121011502-e4ba6080-c7c0-11eb-9036-fd2f28da1733.png)

### 2.2 Label images

The model need to know the name of the object and the location of the object in an image to be able to learn to recognize and detect the object. Therefore, we need to provide it a “map” so that when the model observes an image, it knows what the objects it needs to detect are and where these objects are in the image. To label image, I will use a tool called LabelImg.  

![image](https://user-images.githubusercontent.com/46740045/121012198-aec9ac00-c7c1-11eb-9fa8-d68dc2e75fb1.png)

### 2.3 Generate training data

The next thing to do is to generate training data to feed to the models. Tensorflow Object Detection API requires TFRecord file format in order to start training so the dataset needs to be convert to TFRecord file. Before that, the annotations that have just been created in the previous step must be gathered and converted to CSV file using the xml_to_csv script. Both the training and testing dataset will generate a CSV file separatedly. When it is done, a new CSV file is created containing all the essential details of the detected objects needed to train the model.

![image](https://user-images.githubusercontent.com/46740045/121012473-f0f2ed80-c7c1-11eb-814c-d974cc8bcbf8.png)


### 2.4 Create label map and configure training

The label map is used to tell the model what each object is by defining a mapping of class names to class ID numbers. The label map ID numbers should be the same as what is defined in the generate_tfrecord.py file. I used a text editor to create a new file and save it as labelmap.pbtxt in the “training” folder. Since my dataset only has one class, the labelmap.pbtxt file is as below.

item {
  id: 1
  name: 'person'
}

After creating a label map, it is time to configure the model for training. State-of-the-art models’ configuration on Tensorflow Object Detection API have already been optimized by the developers so I do not have to make any changes to the hyper parameters such as batch size, learning rate, epochs, etc. What I need to do is to provide paths to the labelmap, checkpoint and TFRecord files that I just generated on the previous step.

### 2.5 Train model

The model training process can take days running in order to achieve a good model with high accuracy if trained on a CPU. Nevertheless, the process can be boosted if the model is trained on a GPU or a cloud sever such as Google Cloud, Firebase, etc., both of which require some investments and will contribute to the increase in project’s budget. Therefore, although training on a CPU is slow, it is affordable for a student like myself.

Each step in the training process represents the time a batch of images is passed through the layers of deep neural network. For SSD model training, the batch size is configured as 24 and it is 1 for Faster R-CNN. The training will continue until it reaches the maximum number of steps that is defined in the configuration file. However, it is best that we sometime observe the process and terminate it by ourselves if it has reached an ideal loss range. For SSD model, if the loss after each step is continuously below 2.0 then we can ensure that the model is optimal and is good enough to detect person.

![image](https://user-images.githubusercontent.com/46740045/121012676-2a2b5d80-c7c2-11eb-9b8a-3742d644fa05.png)


# 3. Implementation

The application operates as described in the following diagram: 

![image](https://user-images.githubusercontent.com/46740045/121009902-e6832480-c7be-11eb-8d11-e9dd6883bd64.png)

After running the application, it will show the camera feed, whatever is recorded by the webcam will be displayed on the computer. If a person enters the frame, it will instantly detect that person and draw a bounding box to locate where the person is in the frame. The confidence score is also really high with 98%, this means that the model is 98% sure that the object it detected in the frame is a person. Although only half of my body is visible in the frame, the model can still detect me as person. The FPS is also really high compared to running the Faster R-CNN model. If it detects at least one person in a frame, status will change to “Person detected” and if not, it will display “Person not detect”

![image](https://user-images.githubusercontent.com/46740045/121010553-c4d66d00-c7bf-11eb-925f-8f06493addee.png)

The alert email sent to house’s owner about trespassing. It also sends along with an attachment which is the screenshot captured when it first detects someone.

![image](https://user-images.githubusercontent.com/46740045/121010566-c9028a80-c7bf-11eb-931d-84baf51adcf3.png)

After receiving the mail, the house’s owner should go to the website to check the cameras. The website only displays recorded videos but my intention at first was to build a website that can stream directly from the cameras. However, due to time restriction, I could not turn this idea into practice but it might as well be one of the improvement in the future.

![image](https://user-images.githubusercontent.com/46740045/121010586-ce5fd500-c7bf-11eb-8ae1-2c392111f844.png)
