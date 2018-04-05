using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class PassiveNavC : MonoBehaviour {

    private Video.CityRoutes cityRoutes;
    private List<int> run_trial_order = new List<int>();
    private Config_cs vars;
    private bool navigate;
    private Video.Route route;
    private void Awake()
    {
        vars = Manager.config;

    }

    public void SetupTrial(int cityNum)
    {
        navigate = true;
        //int cityNum = 0;
        print(Manager.experiment.video);
        route = Manager.experiment.video.NavGetRoute(cityNum - 1);
    }

    public void StartTrial()
    {
        StartCoroutine(PassiveNav());
    }

    public void StopTrial()
    {
        navigate = false;
    }

    public IEnumerator PassiveNav()
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
