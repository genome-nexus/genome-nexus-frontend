import {computed} from "mobx";
import {observer} from "mobx-react";
import * as React from 'react';


interface IVariantProps
{
    variant: string;
}

@observer
class Variant extends React.Component<IVariantProps>
{
    @computed
    private get variant() {
        return this.props.variant;
    }

    public render()
    {
        return (
            <div>
                {this.variant}
            </div>
        );
    }
}

export default Variant;
