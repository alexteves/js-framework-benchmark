import {Store} from './store.es6';
import san from 'san';

var store = new Store();

var startTime;
var lastMeasure;
var startMeasure = function (name) {
    startTime = performance.now();
    lastMeasure = name;
};
var stopMeasure = function () {
    var last = lastMeasure;
    if (lastMeasure) {
        window.setTimeout(function () {
            lastMeasure = null;
            var stop = performance.now();
            console.log(last + " took " + (stop - startTime));
        }, 0);
    }
};

export default san.defineComponent({
    template:` <div class="container">
        <div class="jumbotron">
            <div class="row">
                <div class="col-md-6">
                    <h1>san v3.2.3</h1>
                </div>
                <div class="col-md-6">
                    <div class="row">
                        <div class="col-sm-6 smallpad">
                          <button type="button" class="btn btn-primary btn-block" id="run" on-click="run">Create 1,000 rows</button>
                        </div>
                        <div class="col-sm-6 smallpad">
                            <button type="button" class="btn btn-primary btn-block" id="runlots" on-click="runLots">Create 10,000 rows</button>
                        </div>
                        <div class="col-sm-6 smallpad">
                            <button type="button" class="btn btn-primary btn-block" id="add" on-click="add">Append 1,000 rows</button>
                        </div>
                        <div class="col-sm-6 smallpad">
                            <button type="button" class="btn btn-primary btn-block" id="update" on-click="update">Update every 10th row</button>
                        </div>
                        <div class="col-sm-6 smallpad">
                            <button type="button" class="btn btn-primary btn-block" id="clear" on-click="clear">Clear</button>
                        </div>
                        <div class="col-sm-6 smallpad">
                            <button type="button" class="btn btn-primary btn-block" id="swaprows" on-click="swapRows">Swap Rows</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <table class="table table-hover table-striped test-data" @click="handleClick">
            <tbody>
                <tr s-for="item in rows" class="{{item.id === selected? 'danger':''}}">
                    <td class="col-md-1">{{item.id}}</td>
                    <td class="col-md-4">
                        <a data-action="select" data-id="{{item.id}}">{{item.label}}</a>
                    </td>
                    <td class="col-md-1">
                        <a>
                            <span class="glyphicon glyphicon-remove" aria-hidden="true"
                                data-action="remove" data-id="{{item.id}}"></span>
                        </a>
                    </td>
                    <td class="col-md-6"></td>
                </tr>
            </tbody>
        </table>
        <span class="preloadicon glyphicon glyphicon-remove" aria-hidden="true"></span>
    </div>`,
    initData: () => ({
        rows: store.data,
        selected: store.selected
    }),
    handleClick(e) {
        const {action, id} = e.target.dataset;
        if (action && id) {
            this[action](id);
        }
    },
    add() {
        startMeasure("add");
        store.add();
        this.sync();
        stopMeasure();
    },
    remove(id) {
        startMeasure("remove");
        store.delete(id);
        this.sync();
        stopMeasure();
    },
    select(id) {
        startMeasure("select");
        store.select(id);
        this.sync();
        stopMeasure();
    },
    run() {
        startMeasure("run");
        store.run();
        this.sync();
        stopMeasure();
    },
    update() {
        startMeasure("update");
        store.update();
        this.sync();
        stopMeasure();
    },
    runLots() {
        startMeasure("runLots");
        store.runLots();
        this.sync();
        stopMeasure();
    },
    clear() {
        startMeasure("clear");
        store.clear();
        this.sync();
        stopMeasure();
    },
    swapRows() {
        startMeasure("swapRows");
        store.swapRows();
        this.sync();
        stopMeasure();
    },
    sync() {
        this.data.set('rows', store.data);

        this.data.set('selected', store.selected);
    }
});
