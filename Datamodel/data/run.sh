
srcPath='./src'
cd $srcPath

echo "Start the process...."

userNumber=100
generate=false ## if need to change
if $generate ; then
	echo "  Generate $userNumber email address..."
	#python3 generate_email.py $userNumber
	echo "  Generate tables...."
	#python3 generate_table.py
fi

echo "\nStart insert data..."
python3 insert_test_data.py
echo "\nFinish....!!"
