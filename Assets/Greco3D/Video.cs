using System.Collections.Generic;
using UnityEngine;
using System.IO;
using System.Collections;
using System.Xml;
using System.Xml.Serialization;
using System.Text;

[XmlRoot("CityCollection")]
public class Video {

	[XmlAttribute("name")]
    public string version;
	public int numCities;
    public string path;

	[XmlArray("Cities")]
	[XmlArrayItem("Routes")]
    public List<CityRoutes> TaskVideos = new List<CityRoutes>();
    

    public Video(string navPath, string taskName, int num)
    {
        numCities = num;
        version = taskName;
        path = navPath;

            for (int iCity = 0; iCity < numCities; iCity++)
            {
                CityRoutes newCityRoutes = BuildCityVideos(navPath, taskName, iCity);
                TaskVideos.Add(newCityRoutes);
                Debug.Log("Loading " + taskName + " city " + iCity.ToString() + "...");
            }
    }

	public Video()
    {
        numCities = 2;
        version = "Practice";
        path = "NavClipsFinalRand";
		TaskVideos = new List<CityRoutes>();
    }

    public static Route LoadSingleVideo(Paths.PosRotPath posrotpath)
    {
        List<Vector3> posList = LoadPosition(posrotpath.posPath);
        List<Quaternion> rotList = LoadRotation(posrotpath.rotPath);

        Route newroute = new Route(posList, rotList, posrotpath.posPath, posrotpath.rotPath);


        return newroute;
    }

    public CityRoutes BuildCityVideos(string navPath, string taskName, int cityNum)
    {
        List<string> posFilePathList = Paths.LoadCityRoutePaths(navPath, taskName, cityNum, "Position");

        List<string> rotFilePathList = Paths.LoadCityRoutePaths(navPath, taskName, cityNum, "Rotation");

        List<Route> routeList = new List<Route>();

        if (posFilePathList.Count != rotFilePathList.Count)
        {
            Debug.LogError("Route position files do not match rotation files");
        }

        for (int i = 0; i < posFilePathList.Count; i++)
        {
            List<Vector3> posList = LoadPosition(posFilePathList[i]);
            List<Quaternion> rotList = LoadRotation(rotFilePathList[i]);

            Route newroute = new Route(posList, rotList, posFilePathList[i], rotFilePathList[i]);
            routeList.Add(newroute);
        }
        return(new CityRoutes(routeList));
    }
  


	public class PosRot{

		public Vector3 position = new Vector3();
		public Quaternion rotation;
		public PosRot(Vector3 P, Quaternion R){
			position = P;
			rotation = R;
		}

		public PosRot(){
		}
	}

    public class Route
    {
        public List<PosRot> list = new List<PosRot>();
        public string fpathPos;
        public string fpathRot;
        public Route(List<Vector3> posList, List<Quaternion> rotList, string ppath, string rpath)
        {
            fpathPos = ppath;
            fpathRot = rpath;

            int numPoints = posList.Count;
            for(int i = 0; i< numPoints; i++)
            {
                list.Add(new PosRot(posList[i], rotList[i]));
            }
        }

		public Route(){
		}

    }

    public class CityRoutes
    {
        public List<Route> list = new List<Route>();
        public CityRoutes(List<Route> routeList)
        {
            list = routeList;
        }
		public CityRoutes()
		{
		}	
    }

    public static List<Vector3> LoadPosition(string fpath){
		StreamReader reader = new StreamReader(fpath);
		string line = "";
		string[] lineArray;
		float x;
		float y;
		float z;
		List<Vector3> list = new List<Vector3>();

		while(line != null){
			line  =reader.ReadLine();
			if(line !=null){
				lineArray = line.Split(',');
				x = float.Parse(lineArray[0]);
				y = float.Parse(lineArray[1]);
				z = float.Parse(lineArray[2]);
                list.Add(new Vector3(x, y, z));
            }
        }
        return list;
	}

    public static List<Quaternion> LoadRotation(string fpath)
    {
        StreamReader reader = new StreamReader(fpath);
        string line = "";
        string[] lineArray;
        float x;
        float y;
        float z;
        float w;
        List<Quaternion> list = new List<Quaternion>();

        while (line != null)
        {
            line = reader.ReadLine();
            if (line != null)
            {
                lineArray = line.Split(',');
                x = float.Parse(lineArray[0]);
                y = float.Parse(lineArray[1]);
                z = float.Parse(lineArray[2]);
                w = float.Parse(lineArray[3]);
                list.Add(new Quaternion(x,y,z,w));
            }
        }

        return list;
    }

 
    //Return route from video
    public Route NavGetRoute(int cityNum)
    {
        CityRoutes cityRoutes = this.TaskVideos[cityNum];
        Debug.Log(cityRoutes.list.Count);
        Route route = cityRoutes.list[0];
        cityRoutes.list.RemoveAt(0);
        Debug.Log("Video route updated");
        Debug.Log(route.fpathPos);
        return route;
    }

 //   public void WriteXML()
 //   {
 //var serializer = new XmlSerializer(typeof(Video));
 //var stream = new FileStream(Application.dataPath + "/" + "video.xml", FileMode.Create);
 //serializer.Serialize(stream, this);
 //stream.Close();

 //   }

	//public void ReadXML(string path)
 //   {
 //var serializer = new XmlSerializer(typeof(Video));
 //var stream = new FileStream(path, FileMode.Open);
 //var container = serializer.Deserialize(stream) as Video;
 //stream.Close();
 //   }

    public class Paths
    {
        public string version;
        public int numCities;
        public string path;
        public List<List<PosRotPath>> TaskPaths = new List<List<PosRotPath>>();

        public Paths(string navPath, string taskName, int num)
        {
            numCities = num;
            version = taskName;
            path = navPath;

            for (int iCity = 0; iCity < numCities; iCity++)
            {
                List<PosRotPath> newCityPaths = GetCityRoutePaths(navPath, taskName, iCity);

                TaskPaths.Add(Shuffle.ShuffleList(newCityPaths));
                Debug.Log("Loading " + taskName + " city " + iCity.ToString() + "...");
            }
        }

        public class PosRotPath
        {
            public string posPath;
            public string rotPath;

            public PosRotPath(string ppath, string rpath)
            {
                posPath = ppath;
                rotPath = rpath;
            }

        }

        public List<PosRotPath> GetCityRoutePaths(string navPath, string taskName, int cityNum)
        {
            List<string> posFilePathList = LoadCityRoutePaths(navPath, taskName, cityNum, "Position");

            List<string> rotFilePathList = LoadCityRoutePaths(navPath, taskName, cityNum, "Rotation");

            List<PosRotPath> posrotPathList = new List<PosRotPath>();

            if (posFilePathList.Count != rotFilePathList.Count)
            {
                Debug.LogError("Route position files do not match rotation files");
            }

            for (int i = 0; i < posFilePathList.Count; i++)
            {
                posrotPathList.Add(new PosRotPath(posFilePathList[i], rotFilePathList[i]));
            }
            return posrotPathList;
        }

        public static List<string> LoadCityRoutePaths(string navPath, string taskName, int cityNum, string type)
        {
            string path = Manager.genBehav.BuildPath(navPath, taskName + "_" + cityNum.ToString(), type);
            return GetFilePaths(path);
        }

  
        public static List<string> GetFilePaths(string path)
        {
            List<string> FilePathList = new List<string>();
            foreach (string file in System.IO.Directory.GetFiles(path))
            {
                FilePathList.Add(file);
            }

            return FilePathList;
        }

        public Route NavGetRouteFromPaths(int cityNum)
        {
            List<PosRotPath> cityPaths = TaskPaths[cityNum];
            Debug.Log(cityPaths.Count);
            PosRotPath posrotpath = cityPaths[0];
            Route route = LoadSingleVideo(posrotpath);
            cityPaths.RemoveAt(0);
            TaskPaths[cityNum] = cityPaths;
            Debug.Log("Video route updated");
            Debug.Log(route.fpathPos);
            return route;
        }
    }
}