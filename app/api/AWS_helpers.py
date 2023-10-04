"""
Amazon S3 Utility Module

This module provides functions to interact with Amazon S3 
for uploading, removing, and managing files.

Module-level Constants:
    BUCKET_NAME (str): The name of the Amazon S3 bucket to be used for file storage.
    S3_LOCATION (str): The base URL for accessing files stored in the S3 bucket.
    ALLOWED_EXTENSIONS (set): A set of allowed file extensions for uploaded files.

Module-level Variables:
    s3 (boto3.client): An initialized Amazon S3 client for performing S3 operations.

Functions:
    1. get_unique_filename(filename)
        Generate a unique filename by appending a random UUID to the given filename's extension.
        
        Parameters:
        - filename (str): The original filename.
        
        Returns:
        - str: A unique filename in the format 'random_uuid.extension'.

    2. upload_file_to_s3(file, acl="public-read")
        Uploads a file to Amazon S3.
        
        Parameters:
        - file (File-like object): The file to be uploaded.
        - acl (str, optional): The access control list (ACL) for the uploaded file.
            Defaults to "public-read," which makes the file publicly accessible.
        
        Returns:
        - dict: A dictionary containing either a "url" key with the S3 file URL if
            the upload is successful, or an "errors" key with a string representation
            of the error message if an error occurs.

    3. remove_file_from_s3(image_url)
        Removes a file from Amazon S3.
        
        Parameters:
        - image_url (str): The URL of the file to be removed.
        
        Returns:
        - Union[bool, dict]: Returns `True` if the file was successfully deleted.
            If an error occurs during deletion, it returns a dictionary with an "errors" key
            containing a string representation of the error message.

Examples:
    # Upload a file to S3 with public-read ACL
    result = upload_file_to_s3(my_file_object)
    if "url" in result:
        print(f"File uploaded successfully. URL: {result['url']}")
    elif "errors" in result:
        print(f"Error uploading file: {result['errors']}")
    else:
        print("Unexpected result.")
    
    # Remove a file from S3
    result = remove_file_from_s3("https://s3.amazonaws.com/my-bucket/my-file.jpg")
    if isinstance(result, bool) and result is True:
        print("File deleted successfully.")
    elif isinstance(result, dict) and "errors" in result:
        print(f"Error deleting file: {result['errors']}")
    else:
        print("Unexpected result.")
"""

import os
import uuid
import boto3
import botocore
from botocore.exceptions import ClientError

BUCKET_NAME = os.environ.get("S3_BUCKET")
S3_LOCATION = f"https://{BUCKET_NAME}.s3.amazonaws.com/"
ALLOWED_EXTENSIONS = {"pdf", "png", "jpg", "jpeg", "gif"}

s3 = boto3.client(
   "s3",
   aws_access_key_id=os.environ.get("S3_KEY"),
   aws_secret_access_key=os.environ.get("S3_SECRET")
)


def get_unique_filename(filename):
    """
    Generate a unique filename by appending a random UUID to the given filename's extension.

    Parameters:
    filename (str): The original filename.

    Returns:
    str: A unique filename in the format 'random_uuid.extension'.
    """
    ext = filename.rsplit(".", 1)[1].lower()
    unique_filename = uuid.uuid4().hex
    return f"{unique_filename}.{ext}"

def upload_file_to_s3(file, acl="public-read"):
    """
    Uploads a file to Amazon S3.

    Args:
        file (File-like object): The file to be uploaded.
        acl (str, optional): The access control list (ACL) for the uploaded file.
            Defaults to "public-read," which makes the file publicly accessible.

    Returns:
        dict: A dictionary containing either a "url" key with the S3 file URL if
        the upload is successful, or an "errors" key with a string representation
        of the error message if an error occurs.

    Note:
        This function assumes that you have initialized the `s3` client and defined the
        `BUCKET_NAME` and `S3_LOCATION` variables elsewhere in your code.

    Example:
        # Upload a file to S3 with public-read ACL
        result = upload_file_to_s3(my_file_object)
        if "url" in result:
            print(f"File uploaded successfully. URL: {result['url']}")
        elif "errors" in result:
            print(f"Error uploading file: {result['errors']}")
        else:
            print("Unexpected result.")
    """
    try:
        s3.upload_fileobj(
            file,
            BUCKET_NAME,
            file.filename,
            ExtraArgs={
                "ACL": acl,
                "ContentType": file.content_type
            }
        )
    except ClientError as error:
        # In case the S3 upload fails
        return {"errors": str(error)}

    return {"url": f"{S3_LOCATION}{file.filename}"}

def remove_file_from_s3(image_url):
    """
    Removes a file from Amazon S3.

    Args:
        image_url (str): The URL of the file to be removed.

    Returns:
        Union[bool, dict]: Returns `True` if the file was successfully deleted.
        If an error occurs during deletion, it returns a dictionary with an "errors" key
        containing a string representation of the error message.

    Note:
        This function assumes that you have initialized the `s3` client and defined the
        `BUCKET_NAME` variable elsewhere in your code.

    Example:
        result = remove_file_from_s3("https://s3.amazonaws.com/my-bucket/my-file.jpg")
        if isinstance(result, bool) and result is True:
            print("File deleted successfully.")
        elif isinstance(result, dict) and "errors" in result:
            print(f"Error deleting file: {result['errors']}")
        else:
            print("Unexpected result.")
    """
    key = image_url.rsplit("/", 1)[1]
    try:
        s3.delete_object(
            Bucket=BUCKET_NAME,
            Key=key
        )
    except ClientError as error:
        return {"errors": str(error)}
    return True
