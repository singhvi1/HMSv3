import { useEffect, useState } from "react";
import { issueCommentService } from "../../../services/apiService";
import Button from "../ui/Button";

const CommentsSection = ({ issueId = "" }) => {
    const initialComments = [{
        _id: "123",
        full_name: "Vikash Kumar",
        comment: 'this is first comment',
        createdAt: "1-2-2025"
    }]
    const [comments, setComments] = useState(initialComments);
    const [text, setText] = useState("");
    // console.log(issueId, "passed to comment section")

    useEffect(() => {
        const fetchComments = async () => {
            const res = await issueCommentService.getIssueAllCommetents(issueId);
            // console.log(res)
            setComments(res.data.comments, "this is response from comment");
        };
        fetchComments();
    }, [issueId]);

    const handleAddComment = async () => {
        if (!text.trim()) return;
        try {
            const res = await issueCommentService.createComment({ comment_text: text, issue_id: issueId });
            // console.log(res)

            setComments((prev) => [...prev, res.data.comment]);
            setText("");
        } catch (err) {
            console.log("Not able to add comment ", err)
        }
    };

    return (
        <div className="bg-white rounded-xl shadow p-6">
            <h3 className="text-lg text-center font-semibold text-gray-800 mb-4">Discussion</h3>
            <h3 className="font-medium text-gray-700 mb-4">
                Comments
            </h3>

            {comments.length === 0 && (
                <p className="text-sm text-gray-500 mb-4">
                    No comments yet. Be the first to respond.
                </p>
            )}

            <div className="space-y-4 mb-4">

                <div className="border-t pt-4">
                    <textarea
                        className="input w-full mb-3"
                        rows={3}
                        placeholder="Write a comment..."
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    />
                    <Button
                        variant="outline"
                        className="p-1"
                        onClick={handleAddComment}>
                        Add Comment
                    </Button>
                </div>

                <div className="border-t pt-4"></div>
                {comments?.map((c) => (
                    <div
                        key={c?._id}
                        className="bg-gray-50 border rounded-lg p-3"
                    >
                        <div className="text-sm font-medium text-gray-700">
                            {c?.commented_by?.full_name
                            }
                        </div>
                        <div className="text-sm text-gray-600 mt-1">
                            {c?.comment_text}
                        </div>
                        <div className="text-xs text-gray-400 mt-1">
                            {new Date(c.createdAt).toLocaleString() || ""}
                        </div>
                    </div>
                ))}
            </div>

        </div>
    );
};

export default CommentsSection;
