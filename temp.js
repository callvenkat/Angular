var work = function() {
  alert("Working hard");
}

var doWork = function(f) {
  alert("starting");
  
  try {
    alert("before start");
    f();
    alert("ending");
  }
  catch(ex) {}
};

doWork(work);