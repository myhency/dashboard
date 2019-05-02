import React, { Component, Fragment } from 'react';
import { Table } from 'reactstrap';
import ContentCard from 'components/ContentCard';

class Tables extends Component {
    render() {
        return (
            <Fragment>
                <ContentCard title="Table">
                    <Table responsive>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Age</th>
                                <th>Car</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>kwonssy02</td>
                                <td>Tom</td>
                                <td>28</td>
                                <td>Santafe</td>
                            </tr>
                            <tr>
                                <td>2</td>
                                <td>johnf</td>
                                <td>John Doson</td>
                                <td>23</td>
                                <td>Tucson</td>
                            </tr>
                            <tr>
                                <td>3</td>
                                <td>watchApple</td>
                                <td>Steve</td>
                                <td>50</td>
                                <td>Avante</td>
                            </tr>
                        </tbody>
                    </Table>
                </ContentCard>

                <ContentCard title="Striped Table">
                    <Table striped responsive>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Age</th>
                                <th>Car</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>kwonssy02</td>
                                <td>Tom</td>
                                <td>28</td>
                                <td>Santafe</td>
                            </tr>
                            <tr>
                                <td>2</td>
                                <td>johnf</td>
                                <td>John Doson</td>
                                <td>23</td>
                                <td>Tucson</td>
                            </tr>
                            <tr>
                                <td>3</td>
                                <td>watchApple</td>
                                <td>Steve</td>
                                <td>50</td>
                                <td>Avante</td>
                            </tr>
                        </tbody>
                    </Table>
                </ContentCard>

                <ContentCard title="Bordered Table">
                    <Table bordered responsive>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Age</th>
                                <th>Car</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>kwonssy02</td>
                                <td>Tom</td>
                                <td>28</td>
                                <td>Santafe</td>
                            </tr>
                            <tr>
                                <td>2</td>
                                <td>johnf</td>
                                <td>John Doson</td>
                                <td>23</td>
                                <td>Tucson</td>
                            </tr>
                            <tr>
                                <td>3</td>
                                <td>watchApple</td>
                                <td>Steve</td>
                                <td>50</td>
                                <td>Avante</td>
                            </tr>
                        </tbody>
                    </Table>
                </ContentCard>

                <ContentCard title="Borderless Table">
                    <Table borderless responsive>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Age</th>
                                <th>Car</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>kwonssy02</td>
                                <td>Tom</td>
                                <td>28</td>
                                <td>Santafe</td>
                            </tr>
                            <tr>
                                <td>2</td>
                                <td>johnf</td>
                                <td>John Doson</td>
                                <td>23</td>
                                <td>Tucson</td>
                            </tr>
                            <tr>
                                <td>3</td>
                                <td>watchApple</td>
                                <td>Steve</td>
                                <td>50</td>
                                <td>Avante</td>
                            </tr>
                        </tbody>
                    </Table>
                </ContentCard>

                <ContentCard title="Hoverable Table">
                    <Table hover responsive>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Age</th>
                                <th>Car</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>kwonssy02</td>
                                <td>Tom</td>
                                <td>28</td>
                                <td>Santafe</td>
                            </tr>
                            <tr>
                                <td>2</td>
                                <td>johnf</td>
                                <td>John Doson</td>
                                <td>23</td>
                                <td>Tucson</td>
                            </tr>
                            <tr>
                                <td>3</td>
                                <td>watchApple</td>
                                <td>Steve</td>
                                <td>50</td>
                                <td>Avante</td>
                            </tr>
                        </tbody>
                    </Table>
                </ContentCard>

                <ContentCard title="Small Table">
                    <Table size="sm" responsive>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Age</th>
                                <th>Car</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>kwonssy02</td>
                                <td>Tom</td>
                                <td>28</td>
                                <td>Santafe</td>
                            </tr>
                            <tr>
                                <td>2</td>
                                <td>johnf</td>
                                <td>John Doson</td>
                                <td>23</td>
                                <td>Tucson</td>
                            </tr>
                            <tr>
                                <td>3</td>
                                <td>watchApple</td>
                                <td>Steve</td>
                                <td>50</td>
                                <td>Avante</td>
                            </tr>
                        </tbody>
                    </Table>
                </ContentCard>
            </Fragment>
        );
    }
}

export default Tables;