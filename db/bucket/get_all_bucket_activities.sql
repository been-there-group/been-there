SELECT * 
FROM bucket_activities
WHERE user_id = $1;


--we do see all of the user's saved activities, when we 
--route using the user_id