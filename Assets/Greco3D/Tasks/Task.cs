using System.Collections;
using System.Collections.Generic;
using UnityEngine;

namespace Greco3D.UnityFramework.Tasks
{
    public enum TaskState
    {
        Inactive,
        Closed,
        Finished,
        Initialised,
        WaitingToStart,
        Started,
   
    }
    public enum TaskEvent
    {
        Started,
        ForceFinished,
        Quit
    }
    public enum TrialState
    {
        Paused,
        WaitingToStart,
        Running,
        Finished,
        Closed
    }
    public enum TrialEvent
    {
        ForceFinished
    }
    public class Task : MonoBehaviour
    {
        public TaskState ExperimentState { get; set; }
        public TrialState TrialState { get; set; }
    }
}

