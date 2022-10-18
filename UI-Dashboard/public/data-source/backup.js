const columns = [
    {
        name: 'ID',
        selector: row => row['ID'],
    },
    {
        name: 'Project',
        selector: row => row["Project"],
    },
    // {
    //   name: 'Defect Type',
    //   selector: row => row["Defect Type"],
    // },
    {
        name: 'Headline',
        selector: row => row["Headline"],
    },
    // {
    //   name: 'State',
    //   selector: row => row["State"],
    // },
    {
        name: 'Detection Method',
        selector: row => row["Detection Method"],
    },
    {
        name: 'Functional Area',
        selector: row => row["FunctionalArea.Name"],
    },
    {
        name: 'Owner Full Name',
        selector: row => row["OwnerFullName"],
    },
    {
        name: 'ExtComplaintID',
        selector: row => row["ExtComplaintID"],
    },
    {
        name: 'Submitted On',
        selector: row => row["SubmittedOn"],
    },
    {
        name: 'Accepted On',
        selector: row => row["AcceptedOn"],
    },
    {
        name: 'history.new_state',
        selector: row => row["history.new_state"],
    },
    {
        name: 'history.old_state',
        selector: row => row["history.old_state"],
    },
    {
        name: 'history.user_name',
        selector: row => row["history.user_name"],
    },
    {
        name: 'history.action_name',
        selector: row => row["history.action_name"],
    },
    {
        name: 'history.action_timestamp',
        selector: row => row["history.action_timestamp"],
    },
    {
        name: 'Close Reason',
        selector: row => row["CloseReason"],
    },
    {
        name: ' ',
        selector: row => row[" "],
    },
    {
        name: 'TW Initiated Date',
        selector: row => row["TW Initiated Date"],
    },
    {
        name: 'TW Close',
        selector: row => row["TW Close"],
    },
    {
        name: 'TW State',
        selector: row => row["TW State"],
    },
    {
        name: 'TW Age',
        selector: row => row["TW Age"],
    },
    {
        name: 'TW Created Age',
        selector: row => row["TW Created Age"],
    },
    {
        name: 'TW Age Group',
        selector: row => row["TW Age Group"],
    },
    {
        name: 'CQ Age (Days)',
        selector: row => row["CQ Age (Days)"],
    },
    {
        name: 'Group',
        selector: row => row["Group"],
    },
    {
        name: 'FA Group',
        selector: row => row["FA Group"],
    },
    {
        name: 'LCE Group',
        selector: row => row["LCE Group"],
    },
    {
        name: 'Investigation Order',
        selector: row => row["Investigation Order"],
    },
    {
        name: 'Accept Date Order',
        selector: row => row["Accept Date Order"],
    },
    {
        name: 'Days in FA',
        selector: row => row["Days in FA"],
    },
    {
        name: 'Record Change',
        selector: row => row["Record Change"],
    },
    {
        name: 'CQ Age Group',
        selector: row => row["CQ Age Group"],
    },
    {
        name: 'Check',
        selector: row => row["Check"],
    },
    {
        name: 'Check Unique',
        selector: row => row["Check Unique"],
    },
    {
        name: 'SW Release',
        selector: row => row["SW Release"],
    },
    {
        name: 'SW Release (L & SP)',
        selector: row => row["SW Release (L & SP)"],
    },
    {
        name: 'TW Year',
        selector: row => row["TW Year"],
    },
    {
        name: 'TW Initiated Week',
        selector: row => row["TW Initiated Week"],
    },
    {
        name: 'CQ Record',
        selector: row => row["CQ Record"],
    },
    {
        name: 'CQ Submitted Year',
        selector: row => row["CQ Submitted Year"],
    },
    {
        name: 'CQ Submitted Week',
        selector: row => row["CQ Submitted Week"],
    },
];