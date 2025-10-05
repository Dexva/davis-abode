---
layout: ../../../layouts/TinkerShowcaseLayout.astro
title: 'From Scratch: MNIST Digit Recognizer'
pubDate: 2025-10-05
subtitle: 'First time building a neural network'
author: 'Davis'
image:
    url: '/assets/me/experiments/digit-recognizer.png'
    alt: 'Sample digit recognitions by the neural network.'
    width: 942
    height: 449
    scale: 0.45
linkText: GitHub Repo
externalURL: https://github.com/Dexva/machine-learning-tinker/blob/main/2-digit-recognizer/digit-recognizer.ipynb
tags: ['code','machine learning']
---

# From Scratch: MNIST Digit Recognizer

I implemented a simple 3-layer neural network (~80% test accuracy) for recognizing digits from the MNIST dataset, without using any ML libraries! This was mainly inspired by the great explainer video by [Samson Zhang](https://www.youtube.com/watch?v=w8yWXqWQYmU).


## Neural Networks, Put Simply*

*_This was my first time dealing with neural networks, so here I'll try to describe what it is and how it works to the best of my ability._

A [neural network](https://en.wikipedia.org/wiki/Artificial_neural_networks) can be treated like a computational analog to the human brain. Of course, it is far more complicated than that, but at its core it shares 2 main features:

1. It's made out of "neurons" that connect to one another, and

2. It is capable to learn how to perform a certain task.

If you are familiar with graphs in computer science, you can think of a neural network as a bunch of interconnected nodes called "neurons". These nodes are arranged in succeeding layers, and each "connection" represents some kind of mathematical function that operates on the preceeding layers. These functions consist of applying weights an biases, followed by an [activation function](https://en.wikipedia.org/wiki/Activation_function). The numbers associated with the connections in the neural network are what we change during training.

We can train these neural networks through various methods, but a common one is through something called [supervised learning](https://en.wikipedia.org/wiki/Supervised_learning). This is especially good for a classification task, like digit recognition. Put simply, we feed the network a lot of data with corresponding labels. we then iteratively do the following:

1. Do a prediction using the existing weights and biases. This is called forward propagation.
2. Calculate the model's [loss](https://en.wikipedia.org/wiki/Loss_function), i.e., some formula for describing how far off the predictions are from the actual value.
3. Nudge the weights and biases in a direction to decrease the loss. This can be done through [back propagation](https://en.wikipedia.org/wiki/Backpropagation) and the concept of [gradient descent](https://en.wikipedia.org/wiki/Gradient_descent).

After a some iterations (20~100) and at an appropriate [learning rate](https://en.wikipedia.org/wiki/Learning_rate), the neural network can "learn" how to recognize digits (modelled through the learned weights and biases)

## Brief technical details

The training data consists of $m = 60,000$ 26-by-26 pixel images from the [MNIST Dataset on Kaggle](https://www.kaggle.com/datasets/hojjatk/mnist-dataset). Images were read using a sample from [Read MNIST Dataset](https://www.kaggle.com/code/hojjatk/read-mnist-dataset).

The neural network I built follows a 3-layer architecture that is full-batch trained:

0. Input Layer - a matrix $A^{[0]}$ (784 x $m$). Each column represents the image flattened data of one image 
1. Hidden Layer - a matrix $A^{[1]}$ (128 x 1). Activation function: ReLU
2. Output Layer - a matrix $A^{[2]}$ (10 x 1). Each node represents the probability that the image corresponds to a specific digit category. Activation function: softmax.

For the equations used in the implementation, see the documentation on the [Jupyter notebook](https://github.com/Dexva/machine-learning-tinker/blob/main/2-digit-recognizer/digit-recognizer.ipynb).

For training, I did $20$ iterations at a learning rate $\alpha = 0.001$. The model showed a test accuracy of 80.57%.

![Loss and accuracy graphs](/assets/me/experiments/digit-recognizer-graph.png)





