<div style="
    background-color: #cff4fc;
    color: #033b46;
    padding: 20px;
    font-size: 16px;
    border-left: 0.25rem solid #9eeaf9
    ">
    This is a custom Elos call, which means it is not supported by the standard BigBlueButton API
</div>

This call works as [getMeetings](#operation/getMeetings) but list all the meetings (including those which are not running). Also, it can aggregate the recording info when setting `includeRecordings` to `true`.

### Pagination
This call can be paginated using the `limit` and `offset` parameters.