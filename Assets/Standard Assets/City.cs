using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class City : MonoBehaviour {

    public List<string> stores = new List<string>();
    public List<Coords> coordsList = new List<Coords>();
    public List<Run> runList = new List<Run>();
    public List<float> x = new List<float>();
    public List<float> y = new List<float>();

    public City(string name)
    {
        BuildCity(name);
    }


    public class Run
    {
        public List<int> trials = new List<int>();

        public Run(List <int> tri)
        {
            trials = tri;
        }
    }

    public class Coords
    {
        public List<float> x = new List<float>();
        public List<float> y = new List<float>();

        public Coords(List<float> X, List<float> Y)
            {
                x = X;
                y = Y;
            }
    }

    void BuildCity(string name)
    {
        Run run1, run2, run3, run4;
        Coords coords1, coords2, coords3, coords4;

        switch (name)
        {
            case "CE":
                run1 = new Run(new List<int>() { 3, 3, 4, 1, 1, 1, 1, 4, 4, 2, 3, 3, 1, 2, 4, 4, 4, 4, 2, 3, 3, 3, 3, 4 });
                run2 = new Run(new List<int>() { 3, 2, 2, 1, 4, 4, 2, 3, 4, 4, 4, 4, 1, 1, 2, 1, 3, 3, 1, 2, 2, 1, 3, 3 });
                run3 = new Run(new List<int>() { 1, 1, 1, 1, 3, 4, 4, 4, 4, 3, 1, 1, 2, 2, 2, 2, 3, 1, 1, 4, 2, 2, 4, 1 });
                run4 = new Run(new List<int>() { 1, 1, 1, 4, 3, 3, 3, 3, 2, 4, 3, 3, 2, 2, 2, 2, 1, 3, 2, 2, 2, 2, 4, 4 });
                runList = new List<Run>() { run1, run2, run3, run4 };


                //City 1
                x = new List<float>() { 293.50f, 293.50f, 293.50f, 256.00f, 218.50f, 218.50f, 218.50f, 256.00f };
                y = new List<float>() { 293.50f, 243.50f, 218.50f, 218.50f, 218.50f, 268.50f, 293.50f, 293.50f };
                coords1 = new Coords(x, y);

                //City 2
                x = new List<float>() { 291.03f, 294.70f, 291.03f, 256.00f, 220.97f, 217.30f, 220.97f, 256.00f };
                y = new List<float>() { 291.03f, 244.00f, 220.97f, 216.81f, 220.97f, 268.00f, 291.03f, 295.19f };
                coords2 = new Coords(x, y);

                //City 3
                x = new List<float>() { 288.56f, 295.90f, 288.56f, 256.00f, 223.44f, 216.10f, 223.44f, 256.00f };
                y = new List<float>() { 288.56f, 244.49f, 223.44f, 215.13f, 223.44f, 267.51f, 288.56f, 296.87f };
                coords3 = new Coords(x, y);

                //City 4
                x = new List<float>() { 286.09f, 297.11f, 286.09f, 256.00f, 225.91f, 214.89f, 225.91f, 256.00f };
                y = new List<float>() { 286.09f, 244.99f, 225.91f, 213.44f, 225.91f, 267.01f, 286.09f, 298.56f };
                coords4 = new Coords(x, y);

                coordsList = new List<Coords>() { coords1, coords2, coords3, coords4 };
                stores = new List<string>() { "Toy Store", "1ST Bank", "Book Store", "Camera Store", "Coffee Shop", "Craft Shop", "Dentist", "Fast Food Shop" };
                break;
            case "Greco":
                run1 = new Run(new List<int>() { 3, 2, 3, 1, 1, 3, 1, 1, 3, 3, 3, 3, 1, 2, 2, 2, 1, 1, 1, 3, 3, 3, 2, 3, 2 });
                run2 = new Run(new List<int>() { 1, 2, 1, 2, 1, 3, 3, 1, 1, 1, 2, 2, 2, 3, 2, 3, 3, 1, 2, 2, 1, 1, 3, 1, 1 });
                run3 = new Run(new List<int>() { 2, 2, 1, 1, 2, 2, 2, 3, 2, 2, 3, 3, 3, 3, 1, 1, 3, 1, 1, 1, 3, 3, 3, 3, 2 });
                run4 = new Run(new List<int>() { 1, 1, 2, 2, 2, 3, 3, 3, 2, 1, 1, 3, 3, 2, 1, 2, 3, 1, 3, 3, 1, 1, 1, 1, 3 });
                runList = new List<Run>() { run1, run2, run3, run4 };

                x = new List<float>() { 279.74f, 251.32f, 229.88f, 201.28f, 226.39f, 264.04f, 289.14f, 290.84f, 293.10f, 279.74f };
                y = new List<float>() { 282.20f, 306.13f, 284.86f, 256.50f, 240.93f, 217.58f, 202.01f, 225.77f, 257.44f, 282.20f };
                coords1 = new Coords(x, y);

                x = new List<float>() { 279.54f, 257.94f, 230.50f, 214.97f, 225.89f, 255.69f, 282.88f, 286.69f, 291.76f, 279.54f };
                y = new List<float>() { 282.63f, 311.46f, 287.76f, 256.23f, 225.32f, 214.04f, 206.78f, 228.56f, 257.59f, 282.63f };
                coords2 = new Coords(x, y);

                x = new List<float>() { 279.33f, 264.56f, 231.12f, 228.67f, 225.39f, 247.34f, 276.62f, 282.53f, 290.42f, 279.33f };
                y = new List<float>() { 283.05f, 316.80f, 290.67f, 255.97f, 209.71f, 210.50f, 211.55f, 231.35f, 257.75f, 283.05f };
                coords3 = new Coords(x, y);

                coordsList = new List<Coords>() { coords1, coords2, coords3 };

                stores = new List<string> { "Bakery", "Cell Phones", "Gym", "Chinese Food", "Florist", "Toy Store", "Music Store", "Ice Cream", "Dentist" };
                break;

            case "Practice":
                print("setup practice");
                run1 = new Run(new List<int>() { 1, 1, 2, 1, 1, 2, 1, 2, 2, 1 });
                run2 = new Run(new List<int>() { 2, 1, 1, 2, 2, 2, 1, 1, 2, 2 });
                runList = new List<Run>() { run1, run2 };

                x = new List<float>() { 267.54f, 234.22f, 257.60f, 270.85f };
                y = new List<float>() { 273.49f, 274.33f, 227.98f, 241.26f };
                coords1 = new Coords(x, y);

                x = new List<float>() { 272.77f, 234.36f, 248.31f, 269.79f };
                y = new List<float>() { 276.62f, 263.94f, 235.01f, 242.62f };
                coords2 = new Coords(x, y);

                coordsList = new List<Coords>() { coords1, coords2 };

                stores = new List<string>() { "Book Store", "Coffee Shop", "Craft Shop", "1ST Bank" };
                break;
        }
        //Shuffle run order
        runList = Shuffle.ShuffleList(runList);
    }
}
