using System.Collections;
using UnityEngine;

public class PassiveNav : MonoBehaviour {
    private bool navigate;
    private Video.Route route;
 
    public string SetupTrial(int cityNum)
    {
        navigate = true;
        route = Manager.experiment.paths.NavGetRouteFromPaths(cityNum);
        return route.fpathPos;
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
