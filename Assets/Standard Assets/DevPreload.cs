using UnityEngine;

public class DevPreload : MonoBehaviour {

	void Awake()
	{
		GameObject check = GameObject.Find("_holder");
		if (check == null) {
			UnityEngine.SceneManagement.SceneManager.LoadScene ("preload");
		}
	}
}
