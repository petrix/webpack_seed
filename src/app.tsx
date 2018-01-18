import * as React from 'react';
import Child from './Child';

export interface InterfaceAppProps {
  testMessage: string
}

const mockItems = ['First', 'Second', 'Third'];

class App extends React.Component<InterfaceAppProps, {}> {
  render() {
    return (
      <div>
        <Child items={mockItems}/>
      </div>
    );
  }
}

export default App;
