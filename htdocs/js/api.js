var facts = [];

function log(msg) {
    var log = $('#log');
    log.append(msg + "<br/>\n");
    log.scrollTo('100%');
}


function populateExamples() {
    $("#examples").append(new Option("Select example URL", ""));

    $.ajax({
        type: 'GET',
        url: '/listexamples',
        dataType: 'json',
        success: function(body, textStatus, xhr) {
            for (var i=0;i<body.length;i++)
                $("#examples").append(new Option(body[i], body[i]));
        },
        error: function() {
            log("Error listing examples");
        }
    });
}

function fetch(url, cb) {
    log('-> GET ' + url);
    $.ajax({
        type: 'GET',
        url: '/fetch?url='+encodeURI(url),
        dataType: 'json',
        success: function(body, textStatus, xhr) {
            log('<- ' + xhr.status + ' ' + xhr.statusText);
            cb(null, body);
        },
        error: function() {
            log("Error fetching "+url);
        }
    });
}

function storeFact(o) {
    // only store unique facts (FIXME, slow)
    for (var i=0;i<facts.length;i++) {
        if (facts[i].subject == o.subject &&
            facts[i].predicate == o.predicate &&
            facts[i].object == o.object)
                return;
    }
    facts.push(o);
}

function ArrNoDupe(a) {
    var temp = {};
    for (var i = 0; i < a.length; i++)
        temp[a[i]] = true;
    var r = [];
    for (var k in temp)
        r.push(k);
    return r;
}


function isConnected(from, to) {  // one hop
    if (from == to)
        return true;
    for (var i=0;i<facts.length;i++) {
        if (facts[i].subject == from &&
            facts[i].object == to)
            return true;
        if (facts[i].subject == to &&
            facts[i].object == from)
            return true;
    }
    return false;
}

// Look away now Mr. Dijkstra
function reachable(from, to, maxHops) {
    if (isConnected(from, to))
        return true;
    if (maxHops == 0)
        return false;

    var neighbours = [];
    for (var i=0;i<facts.length;i++) {
        if (isConnected(from, facts[i].subject))
            neighbours.push(facts[i].subject);
    }
    neighbours = ArrNoDupe(neighbours);
    for (var i=0;i<neighbours.length;i++) {
        if (reachable(neighbours[i], to, maxHops-1))
            return true;
    }
    return false;
}

