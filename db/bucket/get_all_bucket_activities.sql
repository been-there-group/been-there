SELECT * 
FROM bucket_list
WHERE user_id = $1;


--we do see all of the user's saved activities, when we 
--route using the user_id