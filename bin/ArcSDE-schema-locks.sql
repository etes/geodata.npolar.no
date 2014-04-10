## ArcSDE-db-env: SQL server

# lists user processs connected to the geodatabase
select sde_id, owner, nodename + ':' + sysname "nodename:sysname", start_time from sde.sde_process_information;

# lists ArcSDE table locks currently in use (including owner and table name), along with the user process holding the lock
select a.sde_id, a.owner, l.registration_id, b.owner + '.' + b.table_name "Table", a.nodename, l.lock_type from sde.sde_process_information a, sde.sde_table_registry b, sde.sde_table_locks l
where  a.sde_id = l.sde_id and l.registration_id = b.registration_id
order by "Table";

# lists ArcSDE state locks currently in use
select l.state_id, l.lock_type, a.sde_id, a.owner, a.nodename from sde.sde_process_information a, sde.sde_state_locks l
where  a.sde_id = l.sde_id
order by state_id;

## ArcSDE-db-env: Oracle
# lists user processs connected to the geodatabase
SELECT SDE_ID, OWNER, NODENAME||':'||SYSNAME "NODENAME:SYSNAME",TO_CHAR(START_TIME,'DAY MON DD HH24:MI:SS YYYY') "START_TIME" FROM SDE.PROCESS_INFORMATION;

# lists ArcSDE table locks currently in use (including owner and table name), along with the user process holding the lock
SELECT A.SDE_ID, A.OWNER, L.REGISTRATION_ID, B.OWNER||'.'||B.TABLE_NAME "TABLE", A.NODENAME, L.LOCK_TYPE FROM SDE.PROCESS_INFORMATION A, SDE.TABLE_REGISTRY B, SDE.TABLE_LOCKS L
WHERE A.SDE_ID = L.SDE_ID AND L.REGISTRATION_ID = B.REGISTRATION_ID
ORDER BY "TABLE";

# lists ArcSDE state locks currently in use
SELECT L.STATE_ID, L.LOCK_TYPE, A.SDE_ID, A.OWNER, A.NODENAME FROM SDE.PROCESS_INFORMATION A, SDE.STATE_LOCKS L
WHERE A.SDE_ID = L.SDE_ID
ORDER BY STATE_ID;