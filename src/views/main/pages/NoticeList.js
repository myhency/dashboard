import React, { Component, Fragment } from 'react';
import ContentCard from 'components/ContentCard';
import ContentRow from 'components/ContentRow';
import ContentCol from 'components/ContentCol';
import { Button } from 'reactstrap';

import ReactTable from 'react-table';
import { withRouter } from 'react-router-dom';
import Fetch from 'utils/Fetch';

class NoticeList extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
          data: [],
          pages: null,
          loading: true
        };
    }

    fetchData = (state, instance) => {
        // Whenever the table model changes, or the user sorts or changes pages, this method gets called and passed the current table model.
        // You can set the `loading` prop of the table to true to use the built-in one or show you're own loading bar if you want.
        this.setState({ loading: true });

        // state.pageSize,
        // state.page,
        // state.sorted,
        // state.filtered
        
        let url = `/notices?page=${state.page+1}&rowPerPage=${state.pageSize}`;
        // let url = `/notices`;
        if(state.sorted.length > 0) {
            url += `&sort=${state.sorted[0].id}&desc=${state.sorted[0].desc}`;
        }

        var total;
        var resultTotalPages;

        console.log(url);
        Fetch.GET(url)
        .then(res => {
            total = res.count;
            // 직접 계산해라! 일해라 프론트!
            resultTotalPages = total/state.pageSize + (total%state.pageSize > 0 ? 1 : 0)
            this.setState({
                data: res.results,
                pages: parseInt(resultTotalPages),
            });
        })
        .catch(error => {
            console.log(error);
            // alert("에러");
            // this.props.history.push('/auth/signIn');
        })
        .finally(() => {
            this.setState({
                loading: false
            });
        })
    }

    onClickWriteButton = () => {
        this.props.history.push('/main/pages/noticeWrite');
    }

    render() {
        const { data, pages, loading } = this.state;
        return (
            <Fragment>
                <ContentCard table>
                    <ReactTable
                        columns={[
                            {
                                Header: "ID",
                                accessor: "notice_id",
                                width:100,
                                style: {
                                    textAlign:'center'
                                }
                            },
                            {
                                Header: "Title",
                                accessor: "notice_title"
                            },
                            {
                                Header: "Author",
                                accessor: "notice_author",
                                style: {
                                    textAlign:'center'
                                }
                            },
                            {
                                Header: "Date",
                                accessor: "notice_reg_date",
                                style: {
                                    textAlign:'center'
                                }
                            }
                        ]}
                        getTdProps={(state, rowInfo, column, instance) => {
                            return {
                                onClick: e => {
                                    // this.props.history.push(`/main/pages/notice/${rowInfo.row.notice_id}`);
                                    // alert(rowInfo.row.id);
                                    console.log("Cell - onMouseEnter", {
                                        state,
                                        rowInfo,
                                        column,
                                        instance,
                                        event: e
                                    });
                                }
                            };
                        }}
                        manual // Forces table not to paginate or sort automatically, so we can handle it server-side
                        data={data}
                        pages={pages} // Display the total number of pages
                        loading={loading} // Display the loading overlay when we need it
                        onFetchData={this.fetchData} // Request new data when things change
                        // filterable
                        defaultPageSize={10}
                        className="-striped -highlight"
                    />
                </ContentCard>
                <ContentRow>
                    <ContentCol>
                        <Button color="primary" onClick={this.onClickWriteButton}>작성</Button>
                    </ContentCol>
                </ContentRow>
            </Fragment>
        );
    }
}

export default withRouter(NoticeList);