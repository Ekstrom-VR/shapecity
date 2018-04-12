using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class End : MonoBehaviour {

    private void Start()
    {
        TriggerInstruct();
    }


    void TriggerInstruct()
    {
        StartCoroutine(ShowInstrux());
    }

    IEnumerator ShowInstrux()
    {
        Manager.menu.SetupTaskPanel(Manager.config.version + " completed", "Press any key to continue");
        Manager.menu.panelTask.SetActive(true);
        while (!Input.anyKeyDown)
            yield return null;
        Manager.experiment.LoadExperiment();
        Manager.menu.panelTask.SetActive(false);

    }

}