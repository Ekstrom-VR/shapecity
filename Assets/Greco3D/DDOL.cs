using UnityEngine;

public class DDOL : MonoBehaviour {
    public static DDOL instance = null;
	public void Awake() 
	    {
        if (instance == null)
            instance = this;
        else if(instance != this)

            Destroy(gameObject);

        DontDestroyOnLoad(gameObject);
    }
}