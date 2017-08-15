/**
 * Created by IlyaLitvinov on 10.04.17.
 */
import * as React from 'react';

export interface HelloProps { compiler: string; framework: string; }

export class Test extends Comment {
    t: any;
    constructor() {
        super();
        console.log('test');
    }
}
