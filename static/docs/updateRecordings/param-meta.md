You can pass one or more metadata values to be updated. The format of these parameters is the same as the metadata passed to the [create](#operation/create) call.

When `meta_parameter=NOT EMPTY` and `meta_parameter` exists its value is updated, if it doesn’t exist, the parameter is added. When `meta_parameter=`, and `meta_parameter` exists the key is removed, when it doesn’t exist the action is ignored.