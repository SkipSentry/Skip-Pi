import tensorflow as tf
import matplotlib.pyplot as plt
#import cv2
import os
import numpy as np
from tensorflow.keras.preprocessing.image import ImageDataGenerator
from tensorflow.keras.preprocessing import image
from tensorflow import keras
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Conv2D, MaxPooling2D
from tensorflow.keras.layers import Activation, Dropout, Flatten, Dense

print (tf.__version__)
print(keras.__version__)

#train = ImageDataGenerator(rescale = 1/255,horizontal_flip=True, rotation_range=20,fill_mode='nearest')
#validation = ImageDataGenerator(rescale = 1/255,horizontal_flip=True, rotation_range=20,fill_mode='nearest')
train = ImageDataGenerator(rescale = 1/255 )
validation = ImageDataGenerator(rescale = 1/255)
train_dataset = train.flow_from_directory('/home/dev/pi/SkipBot/TrainingDataFinalSave/SoftmaxData/Training',
                                          target_size = (250,250),
                                          batch_size = 32,
                                          class_mode = 'categorical', color_mode='grayscale')

validation_dataset = train.flow_from_directory('/home/dev/pi/SkipBot/TrainingDataFinalSave/SoftmaxData/Validation',
                                          target_size = (250,250),
                                          batch_size = 32,
                                          class_mode = 'categorical', color_mode='grayscale')

train_dataset.class_indices
print(train_dataset.class_indices)

#model = keras.Sequential ([ tf.keras.layers.Conv2D(16,(50,50),activation = 'relu',input_shape = (200,200,3)),
                                   
#model = tf.keras.models.load_model('skipBotModelDataColorv17.h5')
#model =tf.keras.models.Sequential ([
                                     
                                     #tf.keras.layers.Flatten(input_shape = (200,200,3)),
                                   #  tf.keras.layers.Dense(512, activation='relu'),
                                    #tf.keras.layers.Dense(128, activation='relu'),
                                    # tf.keras.layers.Dense(64, activation='relu'),
                                    # tf.keras.layers.Dense(32, activation='relu'),
                                      
                                     #tf.keras.layers.Dense(1, activation = 'sigmoid')
                                     
                                   # ])
                                   
                                                                      
#model = tf.keras.models.Sequential ([tf.keras.layers.Conv2D(64,(4,4),input_shape = (200,200,3)),
                                      # tf.keras.layers.Activation('relu'),
                                   # tf.keras.layers.MaxPool2D(3,3),
                                    # tf.keras.layers.Conv2D(64,(4,4)),
                                     # tf.keras.layers.Activation('relu'),
                                    # tf.keras.layers.MaxPool2D(3,3),
                                     
                                   #   #tf.keras.layers.Conv2D(64,(3,3)),
                                   # # tf.keras.layers.Activation('relu'),
                                    # #tf.keras.layers.MaxPool2D(2,2),
                                     
                                    # tf.keras.layers.Flatten(),
                                     #tf.keras.layers.Dense(128),
                                     #tf.keras.layers.Activation('relu'),
                                     #tf.keras.layers.Dense(8, activation = 'softmax')
                                     
                                   # ])
                                    
    #######CURRENT WORKS WELL                    ###first layer had 32 in v3 change to 64 in v4           
model = tf.keras.models.Sequential ([tf.keras.layers.Conv2D(32,(5,5),input_shape = (250,250,1)),
                                      tf.keras.layers.Activation('relu'),
                                   tf.keras.layers.MaxPool2D(3,3),
                                     tf.keras.layers.Conv2D(64,(5,5), strides=(2,2)),
                                      tf.keras.layers.Activation('relu'),
                                     tf.keras.layers.MaxPool2D(3,3),
                                     
                                      tf.keras.layers.Conv2D(64,(5,5), strides=(3,3)),
                                     tf.keras.layers.Activation('relu'),
                                     tf.keras.layers.MaxPool2D(2,2),
                                     
                                     tf.keras.layers.Flatten(),
                                     tf.keras.layers.Dense(256),
                                     tf.keras.layers.Activation('relu'),
                                    
                                     tf.keras.layers.Dense(2, activation = 'softmax')
                                     
                                    ])
                                   

 #######CURRENT WORKS WELL  
                                    

                                    


model.compile(loss = 'categorical_crossentropy', optimizer = "adam",metrics=['accuracy'])

model.fit = model.fit(train_dataset, epochs=10, validation_data = validation_dataset )


model.save('skipBotModelDataColorv22TF2_0_0BigColorv8.h5')


