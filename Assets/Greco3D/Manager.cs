using UnityEngine;

public static class Manager
{

    public static Config config;
	public static Experiment experiment;
    public static GenBehav genBehav;
    public static EventManager eventManager;
    public static OutputManager outputManager;


	static Manager()
	{
		GameObject m;
		m = SafeFind("Experiment");
        config = (Config)SafeComponent(m, "Config");
		experiment = (Experiment)SafeComponent(m, "Experiment");
        genBehav = (GenBehav)SafeComponent(m, "GenBehav");
        outputManager = (OutputManager)SafeComponent(m, "OutputManager");
    }

    public static void TestManager()
	{
		Debug.Log ("Manager is working.");
	}

	public static GameObject SafeFind(string s)
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
