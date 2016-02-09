import deepFreeze from 'deep-freeze';
import expect from 'expect';

import reducer from 'app/reducers';

import {
    loadMenu,
} from 'app/actions/dashboard-actions';

import {
    DASHBOARD_LOAD_MENU,
} from 'app/actions';

describe('DASHBOARD REDUCER', function(){

    it('LOAD MENU', function(){
        const state = reducer(undefined, {});
        const actionLoadMenu = {
            type: DASHBOARD_LOAD_MENU,
            menu:[
                {desc:'Item1', route:'/app/item-1',},
                {desc:'Item2', route:'/app/item-2',},
                {desc:'Item3', route:'/app/item-3',},
            ],
        };

        deepFreeze(state);

        const newState = deepFreeze(reducer(state, actionLoadMenu));

        expect(newState.dashboard).toEqual({
            menu: actionLoadMenu.menu,
        });

    });

});
