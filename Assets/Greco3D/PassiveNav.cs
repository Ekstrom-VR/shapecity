using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class PassiveNav : MonoBehaviour {
    //private List<int> run_trial_order = new List<int>();
    private bool navigate;
    private Video.Route route;
 
    public void SetupTrial(int cityNum)
    {
        Debug.Log("Passive Nav: Setting up trial");
        navigate = true;
        //int cityNum = 0;
        //print(Manager.experiment.video);
        //route = Manager.experiment.video.NavGetRoute(cityNum - 1);

        route = Manager.experiment.paths.NavGetRouteFromPaths(cityNum);
    }

    public void StartTrial()
    {
        StartCoroutine(Navigate());
    }

    public void StopTrial()
    {
        navigate = false;
    }

    public IEnumerator Navigate()
    {
        while (navigate)
        {
            Video.PosRot posrot = route.list[0];
            route.list.RemoveAt(0);
            transform.localPosition = posrot.position;
            transform.localRotation = posrot.rotation;
            yield return new WaitForFixedUpdate();
        }
    }
}
