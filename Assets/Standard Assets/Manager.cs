using UnityEngine;

public static class Manager
{

    public static Config_cs config;
	public static Experiment experiment;

	static Manager()
	{
		GameObject m;
		m = safeFind("Experiment");
        config = (Config_cs)SafeComponent(m, "Config_cs");
		experiment = (Experiment)SafeComponent(m, "Experiment");
	}

	public static void TestManager()
	{
		Debug.Log ("Manager is working.");
	}

	public static GameObject safeFind(string s)
	{
		GameObject m = GameObject.Find (s);
		if (m == null) BigProblem ("The" +s+ " game object is not in this scene.");
		return m;
	}

	private static Component SafeComponent(GameObject m, string s)
	{
		Component c = m.GetComponent (s);
		if (c == null) BigProblem ("The" +s+ " component is not there.");
		return c;
	}

	private static void BigProblem(string error)
	{
		Debug.LogError ("Cannot proceed..." + error);
		Debug.Break();
	}
}