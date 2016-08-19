# tsne-d3-python
Visualize high dimensional data with t-sne using D3 and Python

## Requirements

```bash
pip install numpy
pip install tsne
pip install cherrypy
pip install jinja2
```

## Instructions

### Setup

Put your images into the `public/data/` folder.

### Preprocess with t-sne

First, preprocess your data with t-sne:

```bash
python preprocess_with_tsne.py /path/to/data.npy /path/to/images_list.txt
```

where

* `data.npy` is a numpy file with number of rows equal to the number of images and number of columns equals the number of features
* `images_list.txt` is a text file with each row containing the file name of the image corresponding to the row of the numpy array

This preprocessing step converts your high dimensional data into 2D via t-sne dimensionality reduction.

### Visualize

Next, visualize your preprocessed data via

```bash
python visualize_2d_data.py --port 8080 --host 0.0.0.0
```

Open your browser and go to `localhost:8080`. You should see your data visualized! Pan around by dragging with your mouse and zoom with your mouse's scroll wheel.
